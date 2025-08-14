import React from 'react';

const Logo = () => (
    <div className="flex items-center">
        <svg
            width="40"
            height="46"
            viewBox="0 0 50 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-4 text-[#52E5A3]"
        >
            <path
                d="M25 1L49 15.5V44.5L25 57L1 44.5V15.5L25 1Z"
                stroke="currentColor"
                strokeWidth="2"
            />
            <path
                d="M25 7.6L42.4 17.7V42.3L25 50.4L7.6 42.3V17.7L25 7.6Z"
                stroke="currentColor"
                strokeWidth="2"
            />
            <path
                d="M25 14.2L35.8 20.95V39.05L25 43.8L14.2 39.05V20.95L25 14.2Z"
                stroke="currentColor"
                strokeWidth="2"
            />
        </svg>
        <div className="flex flex-col justify-center">
            <span className="text-xl font-bold tracking-wider text-white uppercase" style={{ letterSpacing: '0.1em' }}>
                Climate Insider
            </span>
            <span className="text-xs font-light text-[#52E5A3] self-start mt-1">
                powered by <span className="font-semibold tracking-wider">RESONANCE</span>
            </span>
        </div>
    </div>
);

export default Logo;