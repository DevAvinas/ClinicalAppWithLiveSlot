package com.example.PatientUtility;

import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendMail(String toEmail, String subject, String message) {

	       ThreadPoolExecutor executor = new ThreadPoolExecutor(10, 10, 1, TimeUnit.SECONDS, new LinkedBlockingQueue<Runnable>());

	        // inside your getSalesUserData() method
	        executor.execute(new Runnable() {
	            @Override
	            public void run() {
       SimpleMailMessage mailMessage = new SimpleMailMessage();

       mailMessage.setTo(toEmail);
       mailMessage.setSubject(subject);
       mailMessage.setText(message);

       mailMessage.setFrom("avinas281119@gmail.com");

       javaMailSender.send(mailMessage);
	            }
	        });
    }
}