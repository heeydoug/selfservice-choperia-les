package com.doug.backendSelfChop.repository;

import com.doug.backendSelfChop.domain.PrecoSelfService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrecoSelfServiceRepository extends JpaRepository<PrecoSelfService,Long> {


}
