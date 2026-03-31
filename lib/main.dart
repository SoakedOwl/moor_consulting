import 'package:flutter/material.dart';
import 'widgets/animated_section.dart';
import 'dart:ui';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Metrics Dashboard',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF0A0F1C),
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFF0EA5E9),
          secondary: Color(0xFF8B5CF6),
          surface: Color(0xFF141928),
        ),
        fontFamily: 'Roboto',
        textTheme: const TextTheme(
          headlineMedium: TextStyle(fontWeight: FontWeight.w600, color: Colors.white, letterSpacing: -0.5),
          bodyLarge: TextStyle(color: Color(0xFF94A3B8), fontSize: 16),
        ),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Overview Dashboard'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.transparent,
        flexibleSpace: ClipRect(
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
            child: Container(
              color: const Color(0xFF0A0F1C).withValues(alpha: 0.6),
            ),
          ),
        ),
        title: Text(
          widget.title,
          style: const TextStyle(fontWeight: FontWeight.w500, fontSize: 20),
        ),
        centerTitle: false,
      ),
      body: Stack(
        children: [
          // Subtle background glow
          Positioned(
            top: -150,
            right: -150,
            child: Container(
              width: 500,
              height: 500,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                gradient: RadialGradient(
                  colors: [
                    const Color(0xFF0EA5E9).withValues(alpha: 0.12),
                    Colors.transparent,
                  ],
                ),
              ),
            ),
          ),
          SafeArea(
            child: Center(
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 1000),
                child: SingleChildScrollView(
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 40),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      const FadeSlideEntrance(
                        delay: Duration(milliseconds: 100),
                        child: Text(
                          'Welcome back,',
                          style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold, letterSpacing: -0.5),
                        ),
                      ),
                      const SizedBox(height: 8),
                      FadeSlideEntrance(
                        delay: const Duration(milliseconds: 200),
                        child: Text(
                          'Here is a look at your current metrics and analytics.',
                          style: Theme.of(context).textTheme.bodyLarge,
                        ),
                      ),
                      const SizedBox(height: 40),
                      
                      // Counter Card
                      FadeSlideEntrance(
                        delay: const Duration(milliseconds: 300),
                        child: PremiumCardHover(
                          child: Container(
                            width: double.infinity,
                            padding: const EdgeInsets.all(32),
                            decoration: BoxDecoration(
                              color: Theme.of(context).colorScheme.surface.withValues(alpha: 0.6),
                              borderRadius: BorderRadius.circular(16),
                              border: Border.all(color: Colors.white.withValues(alpha: 0.08)),
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black.withValues(alpha: 0.2),
                                  blurRadius: 20,
                                  offset: const Offset(0, 8),
                                ),
                              ],
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text(
                                  'Button Engagements',
                                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.w500, color: Colors.white70),
                                ),
                                const SizedBox(height: 16),
                                Wrap(
                                  alignment: WrapAlignment.spaceBetween,
                                  runAlignment: WrapAlignment.spaceBetween,
                                  crossAxisAlignment: WrapCrossAlignment.center,
                                  spacing: 24,
                                  runSpacing: 24,
                                  children: [
                                    Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          '$_counter',
                                          style: TextStyle(
                                            fontSize: 48,
                                            fontWeight: FontWeight.bold,
                                            color: Theme.of(context).colorScheme.primary,
                                          ),
                                        ),
                                        const Text('Total clicks today', style: TextStyle(color: Colors.white54)),
                                      ],
                                    ),
                                    PremiumButton(
                                      onPressed: _incrementCounter,
                                      icon: Icons.add,
                                      label: 'Increment',
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                      
                      const SizedBox(height: 40),
                      
                      const FadeSlideEntrance(
                        delay: Duration(milliseconds: 400),
                        child: Text(
                          'Performance Overview',
                          style: TextStyle(fontSize: 24, fontWeight: FontWeight.w600),
                        ),
                      ),
                      const SizedBox(height: 24),
                      
                      const FadeSlideEntrance(
                        delay: Duration(milliseconds: 500),
                        child: AnimatedAnalyticsSection(),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// Reusable micro-interaction button
class PremiumButton extends StatefulWidget {
  final VoidCallback onPressed;
  final IconData icon;
  final String label;

  const PremiumButton({super.key, required this.onPressed, required this.icon, required this.label});

  @override
  State<PremiumButton> createState() => _PremiumButtonState();
}

class _PremiumButtonState extends State<PremiumButton> {
  bool _isHovered = false;
  bool _isPressed = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: GestureDetector(
        onTapDown: (_) => setState(() => _isPressed = true),
        onTapUp: (_) => setState(() => _isPressed = false),
        onTapCancel: () => setState(() => _isPressed = false),
        onTap: widget.onPressed,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          curve: Curves.easeOutCubic,
          transform: Matrix4.diagonal3Values(
            _isPressed ? 0.95 : (_isHovered ? 1.05 : 1.0),
            _isPressed ? 0.95 : (_isHovered ? 1.05 : 1.0),
            1.0,
          ),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                Theme.of(context).colorScheme.primary,
                const Color(0xFF0284C7),
              ],
            ),
            borderRadius: BorderRadius.circular(50),
            boxShadow: _isHovered
                ? [BoxShadow(color: Theme.of(context).colorScheme.primary.withValues(alpha: 0.4), blurRadius: 12, offset: const Offset(0, 4))]
                : [],
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(widget.icon, color: Colors.white, size: 20),
              const SizedBox(width: 8),
              Text(widget.label, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w600)),
            ],
          ),
        ),
      ),
    );
  }
}

// Reusable card hover
class PremiumCardHover extends StatefulWidget {
  final Widget child;
  const PremiumCardHover({super.key, required this.child});

  @override
  State<PremiumCardHover> createState() => _PremiumCardHoverState();
}

class _PremiumCardHoverState extends State<PremiumCardHover> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeOutCubic,
        transform: Matrix4.translationValues(0.0, _isHovered ? -4.0 : 0.0, 0.0),
        child: widget.child,
      ),
    );
  }
}

// Generic entrance animation
class FadeSlideEntrance extends StatefulWidget {
  final Widget child;
  final Duration delay;
  
  const FadeSlideEntrance({super.key, required this.child, this.delay = Duration.zero});

  @override
  State<FadeSlideEntrance> createState() => _FadeSlideEntranceState();
}

class _FadeSlideEntranceState extends State<FadeSlideEntrance> {
  bool _isVisible = false;

  @override
  void initState() {
    super.initState();
    Future.delayed(widget.delay, () {
      if (mounted) {
        setState(() => _isVisible = true);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedOpacity(
      duration: const Duration(milliseconds: 800),
      curve: Curves.easeOutCubic,
      opacity: _isVisible ? 1.0 : 0.0,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 800),
        curve: Curves.easeOutCubic,
        transform: Matrix4.translationValues(0.0, _isVisible ? 0.0 : 30.0, 0.0),
        child: widget.child,
      ),
    );
  }
}
