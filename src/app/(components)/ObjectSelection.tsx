import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const objects = [
    { name: 'Smartphone', image: '/images/smartphone.jpg' },
    { name: 'Laptop', image: '/images/laptop.jpg' },
    { name: 'Car', image: '/images/car.jpg' },
    { name: 'Book', image: '/images/book.jpg' },
    { name: 'Bicycle', image: '/images/bicycle.jpg' },
    { name: 'Television', image: '/images/television.jpg' },
    { name: 'Coffee Maker', image: '/images/coffee-maker.jpg' },
    { name: 'Headphones', image: '/images/headphones.jpg' },
    { name: 'Microwave Oven', image: '/images/microwave-oven.jpg' },
    { name: 'Digital Camera', image: '/images/digital-camera.jpg' },
    { name: 'Refrigerator', image: '/images/refrigerator.jpg' },
    { name: 'Washing Machine', image: '/images/washing-machine.jpg' },
    { name: 'Toothbrush', image: '/images/toothbrush.jpg' },
    { name: 'Tablet', image: '/images/tablet.jpg' },
    { name: 'Smartwatch', image: '/images/smartwatch.jpg' },
    { name: 'Bluetooth Speaker', image: '/images/bluetooth-speaker.jpg' },
    { name: 'Fitness Tracker', image: '/images/fitness-tracker.jpg' },
    { name: 'Air Conditioner', image: '/images/air-conditioner.jpg' },
    { name: 'Electric Kettle', image: '/images/electric-kettle.jpg' },
    { name: 'Robot Vacuum', image: '/images/robot-vacuum.jpg' },
    { name: 'Dishwasher', image: '/images/dishwasher.jpg' },
    { name: 'Gaming Console', image: '/images/gaming-console.jpg' },
    { name: 'Electric Scooter', image: '/images/electric-scooter.jpg' },
    { name: 'Drone', image: '/images/drone.jpg' },
  ];

const ObjectSelection: React.FC<{ onSelect: (object: string) => void }> = ({ onSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(true);

  useEffect(() => {
    if (isSpinning) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % objects.length);
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        setIsSpinning(false);
        const finalIndex = Math.floor(Math.random() * objects.length);
        setCurrentIndex(finalIndex);
        setTimeout(() => onSelect(objects[finalIndex].name), 2000);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isSpinning, onSelect]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-64 h-64 relative overflow-hidden border-4 border-yellow-400 rounded-lg">
        <Image
          src={objects[currentIndex].image}
          alt={objects[currentIndex].name}
          layout="fill"
          objectFit="cover"
          className={isSpinning ? 'animate-spin' : ''}
        />
      </div>
      <h2 className="text-2xl mt-4 font-bold">{objects[currentIndex].name}</h2>
    </div>
  );
};

export default ObjectSelection;