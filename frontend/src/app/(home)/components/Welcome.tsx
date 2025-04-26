'use client';
import { ThemeSwitcher } from '@/components/themeSwitcher';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion';

const Welcome = () => {
    return (
        <div className='h-screen flex items-center flex-col justify-center'>
            <div className='flex mb-2 gap-4'>
                Change theme: <ThemeSwitcher />
            </div>
            <h1 className='text-primary-900'>Say! Hello </h1>
            <p>A Smart Software Solutions.</p>

            <Accordion type='single' collapsible>
                <AccordionItem value='item-1'>
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>{' '}
                <AccordionItem value='item-2'>
                    <AccordionTrigger>sIs it accessible?</AccordionTrigger>
                    <AccordionContent>
                        sYes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default Welcome;
