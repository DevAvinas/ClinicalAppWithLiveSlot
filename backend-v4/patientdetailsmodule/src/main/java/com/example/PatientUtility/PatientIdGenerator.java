package com.example.PatientUtility;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

public class PatientIdGenerator implements IdentifierGenerator{

	@Override
	public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
		String prefix = "PT";
		Connection connection = session.connection();
		
		try {
//			PreparedStatement ps1=connection.prepareStatement("CREATE SEQUENCE IF NOT EXISTS patientidgenerator INCREMENT 1 START 1");
//			ps1.executeQuery();
			PreparedStatement ps = connection.prepareStatement("select nextval('patientidgenerator') as nextval");
			ResultSet result = ps.executeQuery();
			if(result.next()) {
				int id = result.getInt("nextval");
				String pattern = prefix+ String.format("%03d", id);
				return pattern;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return null;
	}

}
