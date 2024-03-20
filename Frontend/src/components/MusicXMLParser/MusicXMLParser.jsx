import React, { useEffect, useRef } from 'react';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';

const MusicXMLParser = ({ sourceFileURL, isPreview }) => {
  const osmdContainerRef = useRef(null);

  useEffect(() => {
    const osmd = new OpenSheetMusicDisplay(osmdContainerRef.current);

    osmd.load(sourceFileURL).then(() => {
      if (!isPreview) {
        osmd.render();
      }
    });
  }, [sourceFileURL, isPreview]);

  return <div ref={osmdContainerRef} style={{ width: '100%', height: '100%' }} />;
};

export default MusicXMLParser;
