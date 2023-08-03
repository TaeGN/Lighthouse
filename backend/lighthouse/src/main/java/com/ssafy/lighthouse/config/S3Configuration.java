package com.ssafy.lighthouse.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

public class S3Configuration {
	@Value("${cloud.aws.credentials.accessKey}")
	private String accessKey;
	@Value("${cloud.aws.credentials.secretKey}")
	private String secretKey;
	@Value("${cloud.aws.static}")
	private String region;

	@Bean
	public AmazonS3Client setS3Client() {
		AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);

		return (AmazonS3Client) AmazonS3ClientBuilder.standard()
			.withCredentials(new AWSStaticCredentialsProvider(credentials))
			.withRegion(this.region)
			.build();
	}
}
