import 'dart:math';

import 'package:flutter/material.dart';

class Particle {
  final double angle;
  final double speed;
  final String char;
  Particle(this.angle, this.speed, this.char);
}

class CanvasCache {
  Size? lastSize;
  List<List<Offset>> cachedPaths = [];

  List<Offset> getPointsForState(int stateIndex, Size size) {
    int numPoints = 200; // Optimize: Reduced points from 500 to 200 to significantly reduce morphing overhead
    double w = size.width;
    double h = size.height;
    Offset center = Offset(w/2, h/2);

    if (stateIndex == 0) return List.filled(numPoints, center);
    
    Path path = Path();
    if (stateIndex == 1) {
      path.moveTo(w*0.1, h*0.8);
      path.lineTo(w*0.9, h*0.8);
    } else if (stateIndex == 2) {
      path.moveTo(w*0.1, h*0.8);
      path.cubicTo(w*0.3, h*0.3, w*0.4, h*0.9, w*0.6, h*0.4);
      path.cubicTo(w*0.7, h*0.1, w*0.8, h*0.7, w*0.9, h*0.2);
    } else if (stateIndex == 3) {
      path.moveTo(w*0.1, h*0.8);
      double barW = (w*0.8) / 7;
      List<double> bH = [h*0.35, h*0.55, h*0.25, h*0.45];
      double cx = w*0.1;
      for(int i=0; i<4; i++) {
        path.lineTo(cx, h*0.8 - bH[i]);
        path.lineTo(cx + barW, h*0.8 - bH[i]);
        path.lineTo(cx + barW, h*0.8);
        cx += 2*barW;
        if(i < 3) path.lineTo(cx, h*0.8);
      }
    } else if (stateIndex == 4) {
      path.moveTo(w*0.1, h*0.8);
      path.cubicTo(w*0.3, h*0.3, w*0.4, h*0.9, w*0.6, h*0.4);
      path.cubicTo(w*0.7, h*0.1, w*0.8, h*0.7, w*0.9, h*0.2);
      path.lineTo(w*0.9, h*0.9);
      path.lineTo(w*0.1, h*0.9);
      path.close();
    } else if (stateIndex == 5) {
      path.moveTo(w*0.1, h*0.8);
      int cols = 12;
      double colW = (w*0.8) / (cols * 2 - 1);
      List<double> cH = [0.2, 0.3, 0.25, 0.4, 0.3, 0.5, 0.45, 0.35, 0.6, 0.5, 0.4, 0.55];
      double cxc = w*0.1;
      for(int i=0; i<cols; i++) {
        path.lineTo(cxc, h*0.8 - (cH[i] * h * 0.8));
        path.lineTo(cxc + colW, h*0.8 - (cH[i] * h * 0.8));
        path.lineTo(cxc + colW, h*0.8);
        cxc += 2*colW;
        if(i < cols-1) path.lineTo(cxc, h*0.8);
      }
    } else if (stateIndex == 6) {
      path.moveTo(w*0.15, h*0.5);
      path.lineTo(w*0.2, h*0.35);
      path.lineTo(w*0.4, h*0.5);
      path.lineTo(w*0.55, h*0.25);
      path.lineTo(w*0.85, h*0.3);
      path.lineTo(w*0.75, h*0.6);
      path.lineTo(w*0.9, h*0.5);
    } else if (stateIndex == 7) {
      path.addOval(Rect.fromCircle(center: center, radius: h*0.25));
    }

    // This metrics call is hugely expensive and no longer runs every frame!
    final metrics = path.computeMetrics().toList();
    if (metrics.isEmpty) return List.filled(numPoints, Offset.zero);
    double totalLength = metrics.fold(0.0, (s, m) => s + m.length);
    double step = totalLength / (numPoints - 1);
    List<Offset> pts = [];
    int mIdx = 0;
    for (int i = 0; i < numPoints; i++) {
      double target = i * step;
      while (mIdx < metrics.length && target > metrics[mIdx].length) {
        target -= metrics[mIdx].length;
        mIdx++;
      }
      if (mIdx >= metrics.length) {
         mIdx = metrics.length - 1;
         target = metrics[mIdx].length;
         if (target < 0) target = 0;
      }
      var tangent = metrics[mIdx].getTangentForOffset(target);
      pts.add(tangent?.position ?? Offset.zero);
    }
    return pts;
  }
}

class AnimatedAnalyticsSection extends StatefulWidget {
  const AnimatedAnalyticsSection({super.key});

  @override
  State<AnimatedAnalyticsSection> createState() => _AnimatedAnalyticsSectionState();
}

class _AnimatedAnalyticsSectionState extends State<AnimatedAnalyticsSection> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late List<Particle> _particles;
  late List<TextPainter> _particlePainters;
  
  final CanvasCache _cache = CanvasCache();

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
       vsync: this, 
       duration: const Duration(seconds: 15)
    )..repeat();

    _particles = List.generate(25, (i) { // Optimized: Reduced from 60 to 25 to hit 60 FPS stably
      final rand = Random(i * 100);
      String chars = "0123ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      return Particle(rand.nextDouble() * 2 * pi, 50 + rand.nextDouble() * 300, chars[rand.nextInt(chars.length)]);
    });
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final primaryColor = Theme.of(context).colorScheme.primary;
    // Optimize Text Render Pipeline: Pre-layout all 25 particles globally!
    _particlePainters = List.generate(25, (i) {
       return TextPainter(
         text: TextSpan(
           text: _particles[i].char, 
           style: TextStyle(color: primaryColor, fontSize: 18, fontWeight: FontWeight.bold)
         ),
         textDirection: TextDirection.ltr,
       )..layout();
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Wrap with RepaintBoundary directly isolating the massive canvas tree repainting to a single isolated layer
    return RepaintBoundary(
      child: Container(
        width: double.infinity,
        height: 450,
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.surface.withValues(alpha: 0.4),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: Colors.white.withValues(alpha: 0.05)),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.2),
              blurRadius: 10, // Optimized shadow calculation layer
              offset: const Offset(0, 5),
            ),
          ],
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(16),
          child: AnimatedBuilder(
            animation: _controller,
            builder: (context, child) {
              return CustomPaint(
                painter: DataJourneyPainter(
                  cache: _cache,
                  progress: _controller.value,
                  primaryColor: Theme.of(context).colorScheme.primary,
                  accentColor: Theme.of(context).colorScheme.secondary,
                  particles: _particles,
                  particlePainters: _particlePainters,
                ),
              );
            },
          ),
        ),
      ),
    );
  }
}

class DataJourneyPainter extends CustomPainter {
  final CanvasCache cache;
  final double progress;
  final Color primaryColor;
  final Color accentColor;
  final List<Particle> particles;
  final List<TextPainter> particlePainters;

  DataJourneyPainter({
    required this.cache,
    required this.progress,
    required this.primaryColor,
    required this.accentColor,
    required this.particles,
    required this.particlePainters,
  });

  List<Offset> morphLeftToRight(List<Offset> start, List<Offset> end, double t) {
    if (t <= 0) return start;
    if (t >= 1) return end;
    return List.generate(start.length, (i) {
      double delay = (i / (start.length - 1)) * 0.7; 
      double pt = (t - delay) / 0.3;
      pt = pt.clamp(0.0, 1.0);
      double easeT = Curves.easeInOutCubic.transform(pt);
      return Offset.lerp(start[i], end[i], easeT)!;
    });
  }

  @override
  void paint(Canvas canvas, Size size) {
    if (size.width == 0 || size.height == 0) return;
    
    // Performance: Only compute paths ONCE. Massive CPU/GPU saving block
    if (cache.lastSize != size || cache.cachedPaths.isEmpty) {
      cache.lastSize = size;
      cache.cachedPaths = [
        cache.getPointsForState(0, size),
        cache.getPointsForState(1, size),
        cache.getPointsForState(2, size),
        cache.getPointsForState(3, size),
        cache.getPointsForState(4, size),
        cache.getPointsForState(5, size),
        cache.getPointsForState(6, size),
        cache.getPointsForState(7, size),
      ];
    }
    
    double t = progress;
    final center = Offset(size.width / 2, size.height / 2);

    void drawText(String text, double targetOpacity, double yOffset, double fontSize, {bool bold = false}) {
      if (targetOpacity <= 0.0) return;
      final textSpan = TextSpan(
        text: text, 
        style: TextStyle(
          color: Colors.white.withValues(alpha: targetOpacity.clamp(0.0, 1.0)),
          fontSize: fontSize,
          fontWeight: bold ? FontWeight.bold : FontWeight.w500,
          letterSpacing: 2.0,
          height: 1.4,
        )
      );
      final textPainter = TextPainter(
        text: textSpan,
        textDirection: TextDirection.ltr,
        textAlign: TextAlign.center,
      );
      textPainter.layout(minWidth: 0, maxWidth: size.width * 0.9);
      final offset = Offset((size.width - textPainter.width) / 2, (size.height - textPainter.height) / 2 + yOffset);
      textPainter.paint(canvas, offset);
    }

    List<Offset> currentLine;
    double lineOpacity = 1.0;
    double fillOpacity = 0.0;

    // Fast O(1) array lookup from pre-compiled path sets instead of computeMetrics
    if (t < 0.15) {
      currentLine = cache.cachedPaths[0];
      lineOpacity = 0.0; 
    } else if (t < 0.20) {
      currentLine = morphLeftToRight(cache.cachedPaths[0], cache.cachedPaths[1], (t - 0.16) / 0.04);
      lineOpacity = ((t - 0.15) / 0.03).clamp(0.0, 1.0);
    } else if (t < 0.26) {
      currentLine = cache.cachedPaths[1];
    } else if (t < 0.33) {
      currentLine = morphLeftToRight(cache.cachedPaths[1], cache.cachedPaths[2], (t - 0.26) / 0.07);
    } else if (t < 0.40) {
      currentLine = morphLeftToRight(cache.cachedPaths[2], cache.cachedPaths[3], (t - 0.33) / 0.07);
      fillOpacity = (t - 0.33) / 0.07;
    } else if (t < 0.47) {
      currentLine = morphLeftToRight(cache.cachedPaths[3], cache.cachedPaths[4], (t - 0.40) / 0.07);
      fillOpacity = 1.0 + ((t - 0.40) / 0.07); 
    } else if (t < 0.54) {
      currentLine = morphLeftToRight(cache.cachedPaths[4], cache.cachedPaths[5], (t - 0.47) / 0.07);
      fillOpacity = 2.0 - ((t - 0.47) / 0.07); 
    } else if (t < 0.61) {
      currentLine = morphLeftToRight(cache.cachedPaths[5], cache.cachedPaths[6], (t - 0.54) / 0.07);
      fillOpacity = 1.0;
    } else if (t < 0.70) {
      currentLine = morphLeftToRight(cache.cachedPaths[6], cache.cachedPaths[7], (t - 0.61) / 0.09);
      fillOpacity = 1.0 - ((t - 0.61) / 0.09);
    } else if (t < 0.77) {
      currentLine = cache.cachedPaths[7];
      fillOpacity = 0.0;
    } else if (t < 0.85) {
      currentLine = morphLeftToRight(cache.cachedPaths[7], cache.cachedPaths[1], (t - 0.77) / 0.08);
      lineOpacity = 1.0 - ((t - 0.80) / 0.05).clamp(0.0, 1.0);
    } else {
      currentLine = cache.cachedPaths[1];
      lineOpacity = 0.0;
    }

    if (lineOpacity > 0.0) {
      Path linePath = Path();
      linePath.moveTo(currentLine.first.dx, currentLine.first.dy);
      for (int i = 1; i < currentLine.length; i++) {
        linePath.lineTo(currentLine[i].dx, currentLine[i].dy);
      }
      
      final linePaint = Paint()
        ..color = primaryColor.withValues(alpha: lineOpacity.clamp(0.0, 1.0))
        ..style = PaintingStyle.stroke
        ..strokeWidth = 3.5
        ..strokeJoin = StrokeJoin.round;
        
      if (fillOpacity > 0.0) {
        canvas.drawPath(linePath, Paint()..color = primaryColor.withValues(alpha: (fillOpacity * 0.15).clamp(0.0, 1.0)));
      }
      
      canvas.drawPath(linePath, Paint()
        ..color = primaryColor.withValues(alpha: (lineOpacity * 0.4).clamp(0.0, 1.0))
        ..style = PaintingStyle.stroke
        ..strokeWidth = 12.0
        ..maskFilter = const MaskFilter.blur(BlurStyle.normal, 8)); // Note: Is isolated efficiently via RepaintBoundary
        
      canvas.drawPath(linePath, linePaint);
      
      if (t > 0.54 && t < 0.70) {
        double mapAlpha = sin(((t - 0.54) / 0.16) * pi).clamp(0.0, 1.0);
        List<Offset> mapNodes = [
          Offset(size.width * 0.2, size.height * 0.35),
          Offset(size.width * 0.4, size.height * 0.5),
          Offset(size.width * 0.55, size.height * 0.25),
          Offset(size.width * 0.75, size.height * 0.6),
          Offset(size.width * 0.85, size.height * 0.3),
        ];
        for (var node in mapNodes) {
          canvas.drawCircle(node, 6, Paint()..color = Colors.white.withValues(alpha: mapAlpha));
          canvas.drawCircle(node, 16 * mapAlpha, Paint()..color = accentColor.withValues(alpha: mapAlpha * 0.5)..style = PaintingStyle.stroke..strokeWidth=3);
        }
      }

      if (t > 0.65 && t < 0.82) {
        double pieT = (t - 0.65) / 0.17;
        double intro = (pieT * 4).clamp(0.0, 1.0);
        double outro = (1.0 - (pieT - 0.8) * 5).clamp(0.0, 1.0);
        double pieAlpha = min(intro, outro);

        if (pieAlpha > 0) {
           double r = size.height * 0.25;
           Rect pieRect = Rect.fromCircle(center: center, radius: r);
           double sweep1 = 2 * pi * 0.4 * Curves.easeOutCubic.transform(intro);
           double sweep2 = 2 * pi * 0.25 * Curves.easeOutCubic.transform((intro * 1.3).clamp(0.0, 1.0));
           canvas.drawArc(pieRect, -pi/2, sweep1, false, Paint()..color = accentColor.withValues(alpha: pieAlpha)..style=PaintingStyle.stroke..strokeWidth=28..strokeCap=StrokeCap.round);
           canvas.drawArc(pieRect, -pi/2 + sweep1 + 0.15, sweep2, false, Paint()..color = Colors.white.withValues(alpha: pieAlpha * 0.8)..style=PaintingStyle.stroke..strokeWidth=28..strokeCap=StrokeCap.round);
        }
      }
    }

    if (t < 0.14) {
       double opacity = 1.0;
       double yOffset = 0.0;
       if (t < 0.03) {
         opacity = t / 0.03;
         yOffset = 20 * (1.0 - Curves.easeOut.transform(opacity));
       } else if (t > 0.08) {
         opacity = 1.0 - ((t - 0.08) / 0.06).clamp(0.0, 1.0);
         if (opacity < 0.8 && opacity > 0.2) {
           yOffset = Random().nextDouble() * 10 - 5;
           canvas.save();
           canvas.translate(Random().nextDouble() * 10 - 5, 0);
         }
       }
       drawText("MOOR", opacity, yOffset, size.width * 0.08, bold: true);
       if (opacity < 0.8 && opacity > 0.2 && t > 0.08) canvas.restore();
    }

    if (t > 0.08 && t < 0.20) {
       double expT = (t - 0.08) / 0.12; 
       double opacity = (1.0 - Curves.easeIn.transform(expT)).clamp(0.0, 1.0);
       
       // PERFORMANCE FIX: We now use a single global layer translation over pre-compiled painters rather than constructing span trees every tick!
       canvas.saveLayer(null, Paint()..color = Colors.white.withValues(alpha: opacity * 0.8));
       for (int i=0; i < particles.length; i++) {
          var p = particles[i];
          double distance = p.speed * Curves.easeOutCubic.transform(expT);
          double px = center.dx + cos(p.angle) * distance;
          double py = center.dy + sin(p.angle) * distance;
          
          final tp = particlePainters[i];
          tp.paint(canvas, Offset(px - tp.width/2, py - tp.height/2));
       }
       canvas.restore();
    }

    if (t > 0.82) {
       double quoteT = (t - 0.82) / 0.18;
       double opacity = 1.0;
       double yOffset = 0.0;
       
       if (quoteT < 0.2) { 
         opacity = Curves.easeIn.transform(quoteT / 0.2);
         yOffset = 20 * (1.0 - opacity);
       } else if (quoteT > 0.9) { 
         opacity = 1.0 - ((quoteT - 0.9) / 0.1); 
       }
       
       drawText("Turning data into direction,\nand insight into impact.", opacity, yOffset, size.width * 0.045);
    }
  }

  @override
  bool shouldRepaint(covariant DataJourneyPainter oldDelegate) => oldDelegate.progress != progress;
}