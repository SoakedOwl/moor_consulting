import 'package:flutter_test/flutter_test.dart';
import 'package:client_website/main.dart'; // Adjust import if needed

void main() {
  testWidgets('Test widget renders', (WidgetTester tester) async {
    await tester.pumpWidget(const MyApp());
    await tester.pump(const Duration(milliseconds: 500));
    await tester.pump(const Duration(milliseconds: 500));
    await tester.pump(const Duration(milliseconds: 500));
    // Test finished
  });
}
