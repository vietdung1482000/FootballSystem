import React, { useEffect } from 'react';

export function Loading(props) {
    const { loader } = props
    useEffect(() => {
        if (loader === true) {
            document.documentElement.classList.add('no-scroll');
        } else {
            document.documentElement.classList.remove('no-scroll');
        }
    }, [loader]);

    return (
        <div className={`components__loading ${loader === true ? "visible" : " invisible"}`}>
            <div className="loading">
                <div className="circle cyan" />
                <div className="circle magenta" />
                <div className="circle yellow" />
            </div>
        </div>
    );
}
Loading.defaultProps = {
    loader: false
}