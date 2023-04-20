package com.doug.backendSelfChop.repository;

import com.doug.backendSelfChop.domain.Notificacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface NotificacaoRepository extends JpaRepository<Notificacao,Long> {

    @Query("SELECT N " +
            " FROM " +
            " Notificacao N " +
            " WHERE " +
            " N.data = CURRENT_DATE AND " +
            " N.status = FALSE ")
    List<Notificacao> findAllByCurrentDateAndItemsNotReplaced();

}
