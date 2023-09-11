package com.woowahanbank.backend.domain.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.woowahanbank.backend.domain.user.dto.SignupDto;
import com.woowahanbank.backend.domain.user.service.UserService;
import com.woowahanbank.backend.global.response.BaseResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

	private final UserService userService;

	@GetMapping("/{userId}")
	public ResponseEntity<?> searchItemList(@PathVariable String userId) {
		SignupDto loginUser = userService.signup(userId);
		return BaseResponse.okWithData(HttpStatus.OK, "Get Login User Successful", loginUser);
	}

	@GetMapping("/duplication/{nickname}")
	public ResponseEntity<?> checkDuplication(@PathVariable String nickname) {
		if (userService.duplicationNickname(nickname)) {
			return BaseResponse.ok(HttpStatus.OK, "사용 가능한 닉네임입니다.");
		}
		;
		return BaseResponse.fail("중복된 닉네임 입니다.", 500);
	}

	@PostMapping("/saveUser")
	public ResponseEntity<?> saveUser(@RequestBody SignupDto signupDto) {
		userService.saveUser(signupDto);
		return BaseResponse.ok(HttpStatus.OK, "회원 가입 성공");
	}

}
