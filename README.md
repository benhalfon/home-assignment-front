To run the application on the docker please run "docker run react"
The password policy:
LengthRule(8, 30), 
UppercaseCharacterRule(1), 
DigitCharacterRule(1),  
NumericalSequenceRule(3,false), 
AlphabeticalSequenceRule(3,false), 
QwertySequenceRule(3,false),
WhitespaceRule()
