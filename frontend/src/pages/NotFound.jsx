import React, { useEffect, useRef } from "react";

function NotFound() {
  const eyesWrapperRef = useRef(null);
  const eyesRef = useRef([]);

  useEffect(() => {
    const handleEyesMove = (e) => {
      const wrapper = eyesWrapperRef.current;

      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const angle =
        Math.atan2(deltaY, deltaX) * (180 / Math.PI);

      eyesRef.current.forEach((eye) => {
        if (eye) {
          eye.style.transform = `rotate(${angle}deg)`;
        }
      });
    };

    document.addEventListener("mousemove", handleEyesMove);

    return () => {
      document.removeEventListener("mousemove", handleEyesMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#ececec] text-[#222] flex items-center justify-center p-6 font-mono">
      
      {/* SVG Filter */}
      <svg width="0" height="0" className="absolute">
        <filter id="sticker">
          <feMorphology
            operator="dilate"
            radius="15"
            in="SourceAlpha"
            result="bg"
          />

          <feFlood
            floodColor="#222"
            result="color"
          />

          <feComposite
            in="color"
            in2="bg"
            operator="in"
            result="coloredBg"
          />

          <feGaussianBlur
            in="coloredBg"
            stdDeviation="8"
            result="blur"
          />

          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 19 -9"
            result="goo"
          />

          <feComposite
            in="SourceGraphic"
            in2="goo"
            operator="atop"
            result="gooey"
          />

          <feMerge>
            <feMergeNode in="gooey" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>

      {/* Main Wrapper */}
      <div className="flex flex-col items-center">

        {/* Text */}
        <div
          className="
            text-center
            text-pink-400
            text-5xl
            leading-tight
            relative
          "
          style={{
            filter: "url(#sticker)",
          }}
        >
          404
          <br />
          Oops!
          <br />
          Page Not Found
        </div>

        {/* Face */}
        <div
          className="
            w-[200px]
            h-[180px]
            -mt-[90px]
            rounded-full
            bg-gradient-to-b
            from-transparent
            from-50%
            to-[#ced1f4]
            to-50%
            relative
          "
        >

          {/* Eyes Wrapper */}
          <div
            ref={eyesWrapperRef}
            className="
              absolute
              top-[99px]
              left-0
              w-full
              flex
              justify-center
              gap-1
            "
          >

            {/* Eye 1 */}
            <div
              ref={(el) => (eyesRef.current[0] = el)}
              className="
                w-10
                h-10
                rounded-full
                bg-white
                flex
                items-center
                justify-center
                transition-transform
                duration-100
              "
            >
              <div
                className="
                  w-[35%]
                  aspect-square
                  rounded-full
                  bg-[#222]
                  translate-x-[100%]
                "
              />
            </div>

            {/* Eye 2 */}
            <div
              ref={(el) => (eyesRef.current[1] = el)}
              className="
                w-10
                h-10
                rounded-full
                bg-white
                flex
                items-center
                justify-center
                transition-transform
                duration-100
              "
            >
              <div
                className="
                  w-[35%]
                  aspect-square
                  rounded-full
                  bg-[#222]
                  translate-x-[100%]
                "
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default NotFound;