package com.example.ProviderRepo;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.ProviderModel.ProviderRegistration;

@Repository
public interface ProviderRepository extends JpaRepository<ProviderRegistration, String> {
	ProviderRegistration findByEmail(String email);

	public ProviderRegistration findByEmailAndPassword(String email, String password);
	@Query(value="select * from provider_registration d where (d.provider_id) IN (?1)",nativeQuery = true)
	ProviderRegistration[] filterPhysician(String[] phyid);
	
	List<ProviderRegistration> findByRole(String role);
	
	@Transactional
	@Modifying
	@Query(value="UPDATE provider_registration SET active = ?2 WHERE email =?1",nativeQuery = true)
	Integer changeStatusByEmailId(String email, boolean parseBoolean);
	@Query("SELECT COUNT(u) FROM ProviderRegistration u WHERE u.role=?1 and u.active=?2")
	long countByRoleAndByActive(String role,boolean active);
	
	
	
}
