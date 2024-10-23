import React from 'react';
import "bootstrap/dist/css/bootstrap.css";

const carList = ["VinFast", "Mercedes", "Lamborghini"];
const colorList = ["red", "blue", "green", "white"];
const SelectCar = () => {
    const [car, setCar] = React.useState({
        car: carList[0],
        color: colorList[0]
    });
    return (
        <>
            <h1>Select your car</h1>
            <label>Select a car
                <select value={car.car}
                        onChange={(e) => {
                            setCar({...car, car: e.target.value})
                        }}>
                    {
                        carList.map((item) => (
                            <option value={item}>{item}</option>
                        ))
                    }
                </select>
            </label>
            <label>Select a color
                <select value={car.color}
                        onChange={(e) => {
                            setCar({...car, color: e.target.value});
                        }}>
                    {
                        colorList.map((item) => (
                            <option value={item}>{item}</option>
                        ))
                    }
                </select>
            </label>
            {
                <h1>You selected a {car.color} - {car.car}</h1>
            }
        </>
    );
}
export default SelectCar;