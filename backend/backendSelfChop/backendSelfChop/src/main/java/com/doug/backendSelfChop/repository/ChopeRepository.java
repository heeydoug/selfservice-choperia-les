package com.doug.backendSelfChop.repository;

import com.doug.backendSelfChop.domain.Chope;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChopeRepository extends JpaRepository<Chope,String> {

    Chope findByRfid(String rfid);

    String deleteByRfid(String rfid);
}
