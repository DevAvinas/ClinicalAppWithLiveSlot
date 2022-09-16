package com.example.utility;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

public class ProviderIdGenerator implements IdentifierGenerator {

	@Override
	public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
		String prefix = "PR";
		Connection connection = session.connection();

		try {
			PreparedStatement ps = connection.prepareStatement("select nextval('provideridgenerator') as nextval");
			ResultSet result = ps.executeQuery();
			if (result.next()) {
				int id = result.getInt("nextval");
				String pattern = prefix + String.format("%03d", id);
				return pattern;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return null;
	}

}
