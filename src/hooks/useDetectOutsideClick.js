import { useEffect, useState } from "react";

const useDetectOutsideClick = (ref, initialState) => {
    const [isActive, setIsActive] = useState(initialState)

    useEffect(() => {
        const onClick = (e) => {
            if (ref.current !== null && !ref.current.contains(e.target)) {
                setIsActive(!isActive)
            }
        }
        if (isActive) {
            window.addEventListener("mousedown", onClick)
        }
        return () => {
            window.removeEventListener("mousedown", onClick)
        }
    }, [isActive, ref])

    return [isActive, setIsActive]
}

export default useDetectOutsideClick