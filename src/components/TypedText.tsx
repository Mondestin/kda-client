import React, { useEffect, useState } from 'react';

const destinations = [
  'Paris to Berlin',
  'Paris to Rome',
  'London to Paris',
  'Amsterdam to Prague',
  'Berlin to Vienna'
];

function TypedText() {
  const [text, setText] = useState('');
  const [destinationIndex, setDestinationIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const destination = destinations[destinationIndex];
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const pauseDuration = 2000;

    if (isTyping) {
      if (charIndex < destination.length) {
        const timer = setTimeout(() => {
          setText(destination.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, typingSpeed);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setIsTyping(false);
        }, pauseDuration);
        return () => clearTimeout(timer);
      }
    } else {
      if (charIndex > 0) {
        const timer = setTimeout(() => {
          setText(destination.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, erasingSpeed);
        return () => clearTimeout(timer);
      } else {
        setDestinationIndex((destinationIndex + 1) % destinations.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, destinationIndex, isTyping]);

  return (
    <span className="text-white">
      From <span className="text-red-500">{text}</span>
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default TypedText;