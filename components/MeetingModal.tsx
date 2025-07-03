'use client';

import React, { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from 'next/image';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  image?: string;
  buttonIcon?: string;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,
  image,
  buttonIcon,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='flex w-full max-w-[520px] flex-col gap-6 border border-gray-700 bg-zinc-900 px-6 py-9 text-white shadow-xl'>

        <div className='flex flex-col gap-6'>
          {image && (
            <div className='flex justify-center'>
              <Image src={image} alt='image' width={72} height={72} />
            </div>
          )}
          <DialogTitle className={cn('text-3xl font-bold leading-[42px]', className)}>
            {title}
          </DialogTitle>
          {children}
          <Button
            className='cursor-pointer bg-blue-400 focus-visible:ring-0 focus-visible:ring-offset-0'
            onClick={() => {
              console.log('Button clicked');
              handleClick?.();
            }}
          >
            {buttonIcon && (
              <>
                <Image src={buttonIcon} alt='button icon' width={13} height={13} />
                &nbsp;
              </>
            )}
            {buttonText || 'Schedule Meeting'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
