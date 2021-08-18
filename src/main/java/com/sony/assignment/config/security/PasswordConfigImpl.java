package com.sony.assignment.config.security;


import java.util.Arrays;

import org.passay.AlphabeticalSequenceRule;
import org.passay.DigitCharacterRule;
import org.passay.LengthRule;
import org.passay.NumericalSequenceRule;
import org.passay.PasswordData;
import org.passay.PasswordValidator;
import org.passay.QwertySequenceRule;
import org.passay.RuleResult;
import org.passay.UppercaseCharacterRule;
import org.passay.WhitespaceRule;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;

import com.sony.assignment.config.exceptions.PasswordPolicyError;

@Configuration
@Validated
public class PasswordConfigImpl implements PasswordConfig {

	private final PasswordValidator validator;
	
	public PasswordConfigImpl() {
		this.validator = new PasswordValidator(Arrays.asList(
				new LengthRule(8, 30), 
				new UppercaseCharacterRule(1), 
				new DigitCharacterRule(1),  
				new NumericalSequenceRule(3,false), 
				new AlphabeticalSequenceRule(3,false), 
				new QwertySequenceRule(3,false),
				new WhitespaceRule()));
	}
	
	@Override
	public PasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	public String encodePassword(String input) {
		RuleResult validation = validate(input);
		if(!validation.isValid())
			throw new PasswordPolicyError(validator.getMessages(validation));
		return this.encoder().encode(input);
	}

	private RuleResult validate(String password) {
		return validator.validate(new PasswordData(password));
	}
}
