import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServerClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const userId = data.session?.user.id;

    if (!userId) {
      return NextResponse.json({ error: 'Login failed' }, { status: 500 });
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('name, role')
      .eq('id', userId)
      .single();

    if (userError) {
      return NextResponse.json(
        { error: userError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      access_token: data.session?.access_token,
      user: {
        id: userId,
        email,
        name: userData?.name || '',
        role: userData?.role || 'DOCTOR',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
