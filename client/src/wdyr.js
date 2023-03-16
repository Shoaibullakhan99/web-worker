import React from 'react';

if(process.env.NODE_ENV === 'development') {
    const whyDidYouRender = require('@weedone-software/why-did-you-render');
    whyDidYouRender(React, {
        trackAllPureComponents: true,
    });
}