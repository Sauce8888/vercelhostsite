'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

interface HostInfoProps {
  propertyId: string;
}

interface Host {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  rating: number;
  response_rate: number;
}

export default function HostInfo({ propertyId }: HostInfoProps) {
  const [host, setHost] = useState<Host | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHostInfo() {
      try {
        // Use sample data if Supabase is not available
        if (!supabase) {
          setHost({
            id: 'sample-host-1',
            name: 'Sarah Johnson',
            bio: "Hi, I'm Sarah! I've been hosting for 5 years and love to share my beautiful beach house with travelers from around the world. I'm always available to help make your stay perfect!",
            avatar: '/images/host-avatar.jpg',
            rating: 4.9,
            response_rate: 98
          });
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('properties')
          .select('host_id')
          .eq('id', propertyId)
          .single();

        if (error) throw error;

        if (data?.host_id) {
          const { data: hostData, error: hostError } = await supabase
            .from('hosts')
            .select('*')
            .eq('id', data.host_id)
            .single();

          if (hostError) throw hostError;
          setHost(hostData);
        }
      } catch (error) {
        console.error('Error fetching host info:', error);
        // Fallback to sample data on error
        setHost({
          id: 'sample-host-1',
          name: 'Sarah Johnson',
          bio: "Hi, I'm Sarah! I've been hosting for 5 years and love to share my beautiful beach house with travelers from around the world. I'm always available to help make your stay perfect!",
          avatar: '/images/host-avatar.jpg',
          rating: 4.9,
          response_rate: 98
        });
      } finally {
        setLoading(false);
      }
    }

    fetchHostInfo();
  }, [propertyId]);

  if (loading) {
    return <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>;
  }

  if (!host) {
    return <div>No host information available</div>;
  }

  return (
    <div className="flex flex-col sm:flex-row items-start gap-4">
      <div className="relative h-16 w-16 rounded-full overflow-hidden">
        {host.avatar ? (
          <Image 
            src={host.avatar} 
            alt={host.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 text-lg">{host.name?.charAt(0) || '?'}</span>
          </div>
        )}
      </div>
      
      <div className="flex-1">
        <h3 className="text-xl font-medium">{host.name || 'Unknown Host'}</h3>
        
        {host.rating !== undefined && (
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center">
              <span className="text-sm">⭐ {host.rating.toFixed(1)}</span>
            </div>
            {host.response_rate !== undefined && (
              <div className="text-sm">
                Response rate: {host.response_rate}%
              </div>
            )}
          </div>
        )}
        
        {host.bio && <p className="mt-2 text-gray-700">{host.bio}</p>}
      </div>
    </div>
  );
} 