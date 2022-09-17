const SIZE = {
    XXL: 1441, // DESKTOP L
    XL: 1200, // DESKTOP M laptop
    LG: 992, // TABLET L
    MD: 768, // TABLET M tablet
    SM: 576, // Mobile L mobile
    XS: 423 // Mobile M
}

export default class Media {
    static SIZE = SIZE

    static greaterThan(windowSize) {
        return `@media only screen and (min-width: ${windowSize}px)`
    }

    static lessThan(windowSize) {
        return `@media only screen and (max-width: ${windowSize - 1}px)`
    }
}
