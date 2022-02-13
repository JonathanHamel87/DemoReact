package fr.jha.demoreact.backend.repositories;

import fr.jha.demoreact.backend.models.Car;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarDao extends JpaRepository<Car, Long> {
}
