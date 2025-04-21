package web.labs.work.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API")
                        .version("1.0")
                        .contact(
                                new io.swagger.v3.oas.models.info.Contact()
                                        .name("Кирилл")
                                        .email("kirill5151122@gmail.com")
                                        .url("https://vk.com/id336902028")));
    }
}