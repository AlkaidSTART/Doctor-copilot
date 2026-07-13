import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const userId = data.user?.id;

    if (!userId) {
      return NextResponse.json({ error: 'User creation failed' }, { status: 500 });
    }

    const { error: profileError } = await supabase.from('users').upsert({
      id: userId,
      email,
      name,
      role: role || 'DOCTOR',
    });

    if (profileError) {
      return NextResponse.json(
        { error: profileError.message },
        { status: 500 }
      );
    }

    const { data: sessionData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      return NextResponse.json(
        { error: signInError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      access_token: sessionData.session?.access_token,
      user: {
        id: userId,
        email,
        name,
        role: role || 'DOCTOR',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
