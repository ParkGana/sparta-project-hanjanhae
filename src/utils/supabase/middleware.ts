import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export const updateSession = async (request: NextRequest) => {
  const supabaseResponse = NextResponse.next({ request });
  const protectedRoutes = ['/mypage', '/like'];

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 로그인한 사용자가 로그인 페이지에 접근하려고 하는 경우 홈 페이지로 이동
  if (user && ['/signin'].includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 로그인하지 않은 사용자가 마이 페이지나 좋아요 페이지에 접근하려고 하는 경우 로그인 페이지로 이동
  if (!user && protectedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // 로그인하지 않은 사용자가 취향조사 수정페이지에 접근하려고 하는 경우 홈 페이지로 이동
  if (
    !user &&
    ['/preferences/customization'].includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return supabaseResponse;
};
