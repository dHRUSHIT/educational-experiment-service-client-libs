package utils;

import java.io.IOException;
import java.lang.annotation.Annotation;

import okhttp3.ResponseBody;
import responsebeans.ErrorResponse;
import retrofit2.Converter;
import retrofit2.Response;


public class ErrorUtils {

    public static ErrorResponse parseError(Response<?> response) {
    	
        Converter<ResponseBody, ErrorResponse> converter = 
                ServiceGenerator.retrofit.responseBodyConverter(ErrorResponse.class, new Annotation[0]);

        ErrorResponse error;

        try {
            error = converter.convert(response.errorBody());
        } catch (IOException e) {
            return new ErrorResponse();
        }

        return error;
    }
}