// Add this to a test file
function testReDoS() {
    const userInput = "(a+)+$";
    const testString = "a".repeat(25) + "x"; // 25 'a's followed by 'x'
    
    console.time("Regex Test");
    const regex = new RegExp(userInput, "gi");
    const result = regex.test(testString);
    console.timeEnd("Regex Test");
    
    return result;
}
  
testReDoS();