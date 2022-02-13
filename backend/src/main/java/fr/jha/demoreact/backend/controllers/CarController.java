package fr.jha.demoreact.backend.controllers;

import fr.jha.demoreact.backend.exceptions.CarNotFoundException;
import fr.jha.demoreact.backend.models.Car;
import fr.jha.demoreact.backend.repositories.CarDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("cars")
public class CarController {
    @Autowired
    CarDao carDao;

    @GetMapping(value = "")
    public List<Car> getAll(){
        List<Car> cars = carDao.findAll();
        return cars;
    }

    @GetMapping(value = "/{id}")
    public Car getOne(@PathVariable Long id){
        return carDao.findById(id)
                .orElseThrow(()-> new CarNotFoundException(id));
    }

    @PostMapping(value = "")
    public Car newCar(@RequestBody Car newCar){
        return carDao.save(newCar);
    }

    @PutMapping(value = "/{id}")
    public Car updateCar(@RequestBody Car newCar, @PathVariable Long id){
        return carDao.findById(id)
                .map(car -> {
                    car.setColor(newCar.getColor());
                    car.setMarque(newCar.getMarque());
                    return carDao.save(car);
                })
                .orElseGet(() -> {
                    newCar.setId(id);
                    return carDao.save(newCar);
                });
    }

    @DeleteMapping(value = "/{id}")
    public void deleteCar(@PathVariable Long id){
        carDao.deleteById(id);
    }
}
