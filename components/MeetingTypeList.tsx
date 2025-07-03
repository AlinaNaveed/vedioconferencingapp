'use client';

import { useState } from 'react';
import HomeCard from './HomeCard';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import { Textarea } from './ui/textarea';
import ReactDatePicker from 'react-datepicker'
import { Input } from './ui/input';


const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >();

  const {user} = useUser();
  const client = useStreamVideoClient();
  const router = useRouter();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description:'',
    link:''
  })

  const [callDetails, setCallDetails] = useState<Call>();

  const createMeeting = async () => {
  console.log("✅ createMeeting called");
  if (!user || !client) {
    console.log("❌ Missing user or client", { user, client });
    return;
  }

  try {
    if(!values.dateTime){
      toast("please select date and time")
      return;

    }

    const id = crypto.randomUUID();
    const call = client.call('default', id);

    if (!call) throw new Error('❌ Failed to create call');

    const statsAt = values.dateTime.toISOString();
    const description = values.description || 'Instant meeting';
    await call.getOrCreate({
      data: {
        starts_at: statsAt,
        custom: { description },
      },
    });

    console.log("✅ Call created", call.id);
    setCallDetails(call);

    if (!values.description) {
      router.push(`/meeting/${call.id}`);
    }
    toast("Meeting created!");

  } catch (error) {
    console.error("❌ Error creating meeting", error);
    toast("Failed to create a meeting!");

  }
};

const meetingLink = `${process.env.Next_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <HomeCard
        img='/icons/add-meeting.svg'
        title='New Meeting'
        description='Start an instant meeting'
        handleClick={() => setMeetingState('isInstantMeeting')}
        className='bg-orange-400'
      />
      <HomeCard
        img='/icons/schedule.svg'
        title='Schedule meeting'
        description='Plan your meeting'
        handleClick={() => setMeetingState('isScheduleMeeting')}
        className='bg-blue-500'
      />
      <HomeCard
        img='/icons/recordings.svg'
        title='View recordings'
        description='Check out your recordings'
        handleClick={() => router.push('/recordings')}
        className='bg-purple-500'
      />
      <HomeCard
        img='/icons/join-meeting.svg'
        title='Join Meeting'
        description='Via invitation link'
        handleClick={() => setMeetingState('isJoiningMeeting')}
        className='bg-yellow-400'
      />
      {!callDetails ? (
        <MeetingModal  
      isOpen={meetingState === 'isScheduleMeeting'}
      onClose={()=> setMeetingState(undefined)}
      title="Create Meeting"
      handleClick={createMeeting}>
        <div className='flex flex-col gap-2.5'>
          <label className='text-base text-normal leading-[22px] text-blue-300'>Add a description</label>
          <Textarea className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0' onChange={(e)=>{
            setValues({...values, description: e.target.value})
          }}/> 
        </div>
        <div className='felx flex-col w-full gap-2.5'>
           <label className='text-base text-normal leading-[22px] text-blue-300'>Select a Date and Time</label>
           <ReactDatePicker 
           selected={values.dateTime}
           onChange={(date) => setValues({...values, dateTime: date!})}
           showTimeSelect
           timeFormat='HH:mm'
           timeIntervals={15}
           timeCaption='time'
           dateFormat="MMMM d, yyyy, h:mm aa"
           className='cursor-pointer w-full rounded bg-dark-3 p-2 focus:outline-none'
           />
        </div>
      </MeetingModal>
    ) : (
    
    <MeetingModal  
      isOpen={meetingState === 'isScheduleMeeting'}
      onClose={()=> setMeetingState(undefined)}
      title="Meeting Created"
      className="text-center"
      handleClick={() => {
        navigator.clipboard.writeText(meetingLink);
        toast('link copied')
      }}

      image='/icons/checked.svg'
      buttonIcon='/icons/copy.svg'
      buttonText="Copy Meeting Link"
      />
      )
      }

      <MeetingModal  
      isOpen={meetingState === 'isInstantMeeting'}
      onClose={()=> setMeetingState(undefined)}
      title="Start an instant meeting"
      className="text-center"
      buttonText="Start Meeting"
      handleClick={createMeeting}
      />

      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>
    </section>
  );
};

export default MeetingTypeList; 