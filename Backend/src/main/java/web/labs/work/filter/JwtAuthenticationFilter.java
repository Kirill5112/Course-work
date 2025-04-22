package web.labs.work.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import web.labs.work.service.CustomUserDetails;
import web.labs.work.service.JwtService;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    public static final String BEARER_PREFIX = "Bearer ";
    public static final String HEADER_NAME = "Authorization";
    private static final List<String> OPEN_ROUTES = List.of("/api/login", "api/register", "login", "register");

    private final JwtService jwtService;
    private final CustomUserDetails customUserDetails;

/*    private final RequestMatcher excludedMatchers = new OrRequestMatcher(
            new AntPathRequestMatcher("/api/login"),
            new AntPathRequestMatcher("/api/register"),
            new AntPathRequestMatcher("/swagger-ui.html"),
            new AntPathRequestMatcher("/v2/api-docs"),
            new AntPathRequestMatcher("/v3/api-docs"),
            new AntPathRequestMatcher("/v3/api-docs/**"),
            new AntPathRequestMatcher("/swagger-resources"),
            new AntPathRequestMatcher("/swagger-resources/**"),
            new AntPathRequestMatcher("/configuration/ui"),
            new AntPathRequestMatcher("/configuration/security"),
            new AntPathRequestMatcher("/swagger-ui/**"),
            new AntPathRequestMatcher("/webjars/**"),
            new AntPathRequestMatcher("/login"),
            new AntPathRequestMatcher("/register")
    );*/

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {


        String path = request.getRequestURI();
        if (OPEN_ROUTES.stream().anyMatch(path::startsWith) && request.getMethod().equals("GET")) {
            filterChain.doFilter(request, response);
            return;
        }

/*        if (excludedMatchers.matches(request)) {
            filterChain.doFilter(request, response);
            return;
        }*/

        var authHeader = request.getHeader(HEADER_NAME);
        if (StringUtils.isEmpty(authHeader) || !authHeader.startsWith(BEARER_PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }

/*        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            return;
        }*/
        String jwt = authHeader.substring(7);
        String username = jwtService.extractUsername(jwt);
/*        if (jwtService.validateToken(jwt)) {
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(username, null, new ArrayList<>());
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            } else {
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
            }
            filterChain.doFilter(request, response);
        }*/
        if (!username.isEmpty() && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = customUserDetails.loadUserByUsername(username);

            if (jwtService.validateToken(jwt)) {
                SecurityContext context = SecurityContextHolder.createEmptyContext();

                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                context.setAuthentication(authToken);
                SecurityContextHolder.setContext(context);
            }
            else throw new ServletException("токен не валиден");
        }
        filterChain.doFilter(request, response);
    }
}
