import { useRef, useEffect } from "react";

const useEffectOnce = (callBack) => {
    const calledOnce = useRef(false)

    useEffect(() => {
        if (!calledOnce.current) {
            callBack()
            calledOnce.current = true
        }
    }, [callBack])
}

export default useEffectOnce