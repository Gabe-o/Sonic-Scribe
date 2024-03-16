import React, { useEffect, useRef } from 'react';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';

const SheetMusic = ({ musicXml }) => {
    const osmdContainerRef = useRef(null);

    useEffect(() => {
        if (musicXml) {
            const osmd = new OpenSheetMusicDisplay(osmdContainerRef.current, {
                // You can add OSMD options here. For example:
                autoResize: true,
                drawFromMeasureNumber: 1,
                drawUpToMeasureNumber: Number.MAX_SAFE_INTEGER,
            });

            osmd.load(musicXml).then(() => osmd.render());
        }
    }, [musicXml]);

    return <div ref={osmdContainerRef} />;
};