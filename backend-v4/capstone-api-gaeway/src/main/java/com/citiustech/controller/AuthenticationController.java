package com.citiustech.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.citiustech.DTO.InvalidLoginAttemptCounter;
import com.citiustech.DTO.LoginDTO;
import com.citiustech.DTO.PatientRegistrationDetailsDTO;
import com.citiustech.DTO.ProviderRegistrationDetailsDTO;
import com.citiustech.service.LoginAttemptService;

@RestController
@RequestMapping("/authenticate")
public class AuthenticationController {

	@Autowired
	private RestTemplate restTemplate;
	@Autowired
	private Environment environment;
	@Autowired
	ModelMapper modelMapper;
	@Autowired
	LoginAttemptService loginAttemptService;
	Map<String, String> map = new HashMap<>();
	Map<String, String> providerMap = new HashMap<>();

	@GetMapping("/test")
	public String test() {
		return "test";
	}

	@PostMapping("/patient")
	public ResponseEntity<?> authenticate(@RequestBody LoginDTO patient) throws ServletException {

		boolean result = false;

		System.out.println(patient.getUsernameOrEmail());
		System.out.println(patient.getPassword());
		System.out.println(patient);

		Object obj = restTemplate.postForObject("http://localhost:8082/api/public/login", patient, Object.class);
		System.out.println("----------------------------");
		System.out.println(obj);
		PatientRegistrationDetailsDTO dto = null;
		if (obj != null) {
			 dto = modelMapper.map(obj, PatientRegistrationDetailsDTO.class);
			System.out.println(dto);
		}
		System.out.println("---------------------------------");
		if (obj != null) {
			result = true;
		} else {
			result = false;
		}
			System.out.println("line 69"+result);
		// Token Generation if User is Present
		if (result) {
			if(dto.isActive()) {
				String token = restTemplate.postForObject("http://localhost:8083/api/generate/patient/token", dto, String.class);
				map.clear();
				map.put("token", token);
				map.put("message", "Successfully logged in");	
				return new ResponseEntity<>(map, HttpStatus.OK);

			}
			else {
				map.clear();
				map.put("token", null);
				map.put("message", "Account Blocked.Contact Admin for Re-Activation");
				return new ResponseEntity<>(map, HttpStatus.UNAUTHORIZED);

			}


		} 
				else 
				{
					String apiUrl = "http://127.0.0.1:8082/api/public/findbyemail/{email}";
					Object response = restTemplate.getForObject(apiUrl, Object.class, patient.getUsernameOrEmail());
					if(response!=null) {
					InvalidLoginAttemptCounter ob =
							loginAttemptService.findById(patient.getUsernameOrEmail());
							if(ob==null) {
								InvalidLoginAttemptCounter row =
										new InvalidLoginAttemptCounter();
								row.setEmail(patient.getUsernameOrEmail());
								row.setAttemptcount(2);
								loginAttemptService.save(row);
								map.clear();
								map.put("token", null);
								map.put("message","Invalid username or password.Attempt Remaining"+(2) );
							}
									else {
										int count =ob.getAttemptcount();
										if(count==0) {
											map.clear();
											map.put("token", null);
											map.put("message", "Account Blocked.Contact Admin for Re-Activation");
										}
										else if(count==1) {
											InvalidLoginAttemptCounter row =
													new InvalidLoginAttemptCounter();
											row.setEmail(patient.getUsernameOrEmail());
											row.setAttemptcount(count-1);
											loginAttemptService.save(row);
											String points=patient.getUsernameOrEmail()+"/"+"false";
											System.out.println(points);
											String apiUrl1 = "http://localhost:8082/api/public/changestatus/{email}/{status}";
											int affect = restTemplate.getForObject(apiUrl1, Integer.class, patient.getUsernameOrEmail(),"false");
											map.clear();
											map.put("token", null);
											map.put("message", "Max Attempt Reached.Account Blocked.Contact Admin for Re-Activation");
										}
										else {
										
										InvalidLoginAttemptCounter row =
												new InvalidLoginAttemptCounter();
										row.setEmail(patient.getUsernameOrEmail());
										row.setAttemptcount(count-1);
										loginAttemptService.save(row);

										map.clear();
										map.put("token", null);
										map.put("message","Invalid username or password.Attempt Remaining"+(count-1) );
										}
									}
					}
					else
					{
						map.clear();
						map.put("token", null);
						map.put("message", "Invalid username or password");
					}
			
					return new ResponseEntity<>(map, HttpStatus.UNAUTHORIZED);
				}

	}

	@PostMapping("/provider")
	public ResponseEntity<?> authenticateProvider(@RequestBody LoginDTO provider) throws ServletException {

		boolean result = false;

		System.out.println(provider.getUsernameOrEmail());
		System.out.println(provider.getPassword());
		System.out.println(provider);

		Object obj = restTemplate.postForObject("http://localhost:8087/api/public/login/provider", provider, Object.class);
		System.out.println("----------------------------");
		System.out.println(obj);
		ProviderRegistrationDetailsDTO dto = null;
		if (obj != null) {
			 dto = modelMapper.map(obj, ProviderRegistrationDetailsDTO.class);
			System.out.println(dto);
		}
		System.out.println("---------------------------------");
		if (obj != null) {
			result = true;
		} else {
			result = false;
		}

		// Token Generation if User is Present
		if (result) {
			if(dto.isActive()) {
				String token = restTemplate.postForObject("http://localhost:8083/api/generate/provider/token", dto, String.class);
				providerMap.clear();
				providerMap.put("token", token);
				providerMap.put("message", "Successfully logged in");	
				return new ResponseEntity<>(providerMap, HttpStatus.OK);

			}
			else {
				providerMap.clear();
				providerMap.put("token", null);
				providerMap.put("message", "Account Blocked.Contact Admin for Re-Activation");
				return new ResponseEntity<>(providerMap, HttpStatus.UNAUTHORIZED);

			}

		} else {
			String apiUrl = "http://127.0.0.1:8087/api/public/find/provider/byemail/{email}";
			Object response = restTemplate.getForObject(apiUrl, Object.class, provider.getUsernameOrEmail());
			if(response!=null) {
			InvalidLoginAttemptCounter ob =
					loginAttemptService.findById(provider.getUsernameOrEmail());
					if(ob==null) {
						InvalidLoginAttemptCounter row =
								new InvalidLoginAttemptCounter();
						row.setEmail(provider.getUsernameOrEmail());
						row.setAttemptcount(2);
						loginAttemptService.save(row);
						providerMap.clear();
						providerMap.put("token", null);
						providerMap.put("message","Invalid username or password.Attempt Remaining"+(2) );
					}
							else {
								int count =ob.getAttemptcount();
								if(count==0) {
									providerMap.clear();
									providerMap.put("token", null);
									providerMap.put("message", "Account Blocked.Contact Admin for Re-Activation");
								}
								else if(count==1) {
									InvalidLoginAttemptCounter row =
											new InvalidLoginAttemptCounter();
									row.setEmail(provider.getUsernameOrEmail());
									row.setAttemptcount(count-1);
									loginAttemptService.save(row);
									String points=provider.getUsernameOrEmail()+"/"+"false";
									System.out.println(points);
									String apiUrl1 = "http://localhost:8087/api/public/changestatus/{email}/{status}";
									int affect = restTemplate.getForObject(apiUrl1, Integer.class, provider.getUsernameOrEmail(),"false");
									providerMap.clear();
									providerMap.put("token", null);
									providerMap.put("message", "Max Attempt Reached.Account Blocked.Contact Admin for Re-Activation");
								}
								else {
								
								InvalidLoginAttemptCounter row =
										new InvalidLoginAttemptCounter();
								row.setEmail(provider.getUsernameOrEmail());
								row.setAttemptcount(count-1);
								loginAttemptService.save(row);

								providerMap.clear();
								providerMap.put("token", null);
								providerMap.put("message","Invalid username or password.Attempt Remaining"+(count-1) );
								}
							}
			}
			else
			{
				providerMap.clear();
				providerMap.put("token", null);
				providerMap.put("message", "Invalid username or password");
			}
	
			return new ResponseEntity<>(providerMap, HttpStatus.UNAUTHORIZED);
		}

	}
	@GetMapping("/deleteLoginAttemptCounter/{email}")
    public void deleteLoginAttemptCounter(@PathVariable String email){
        loginAttemptService.deleteInvalidLoginCount(email);
    }

}
