'use client';

import {useRef, type ReactNode} from 'react';
import {PracticeAreas} from './PracticeAreas';
import {Conveyancing} from './Conveyancing';
import {Enquiry, type EnquiryHandle} from './Enquiry';

/**
 * Practice areas and the conveyancing estimator can prefill the enquiry form.
 * Sections in between are passed as children so they stay server-rendered.
 */
export function LegalInteractive({children}: {children: ReactNode}) {
  const enquiry = useRef<EnquiryHandle>(null);
  return (
    <>
      <PracticeAreas onEnquire={a => enquiry.current?.prefillArea(a)} />
      <Conveyancing onEnquire={s => enquiry.current?.prefillQuote(s)} />
      {children}
      <Enquiry ref={enquiry} />
    </>
  );
}
