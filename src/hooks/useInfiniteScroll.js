import { useEffect, useCallback } from "react";

const useInfiniteScroll = (bodyRef, bottomLineRef, callBack) => {
    const handleScroll = useCallback(() => {
        const containerHeight = bodyRef?.current?.getBoundingClientRect().height
        const { top: bottomLineTop } = bottomLineRef?.current?.getBoundingClientRect()
        if (bottomLineTop <= containerHeight) {
            callBack()
        }
    }, [bodyRef, bottomLineRef, callBack])

    useEffect(() => {
        const bodyRefCurrent = bodyRef?.current;
        bodyRefCurrent?.addEventListener("scroll", handleScroll, true)

        return () => {
            bodyRefCurrent?.removeEventListener("scroll", handleScroll, true)
        }
    }, [bodyRef, handleScroll])
}

export default useInfiniteScroll