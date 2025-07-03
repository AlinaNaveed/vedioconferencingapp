import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetCalls = () => {
    const [calls, setCalls] = useState<Call[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const client = useStreamVideoClient();
    const {user} = useUser();

    useEffect(() => {
        const loadCalls = async () => {
            if(!client || !user?.id) return;
            setIsLoading(true);

            try{
                const {calls} = await client.queryCalls({
                    sort: [{field: 'starts_at', direction: -1}],
                    filter_conditions: {
                        starts_at: { $exists: true },
                        $or: [
                            {created_by_user_id: user.id},
                            {members: {$in: [user.id]}},
                        ]
                    }
                });
console.log("📞 All fetched calls:", calls);
                setCalls(calls);
            }
            catch(error){
                console.log(error);
            }
            finally{
                setIsLoading(false);
            }
            
        }
        loadCalls();
    }, [client, user?.id])

    const now = new Date();

const endedCalls = calls.filter(call => {
  const startsAt = call.state?.startsAt
    ? new Date(call.state.startsAt)
    : null;
  const endedAt = call.state?.endedAt;
  return (startsAt && startsAt < now) || !!endedAt;
});

const upcomingCalls = calls.filter(call => {
  const startsAt = call.state?.startsAt
    ? new Date(call.state.startsAt)
    : null;
  return startsAt && startsAt > now;
});


    return {
        endedCalls,
        upcomingCalls,
        callRecordings: calls,
        isLoading,
    }
}