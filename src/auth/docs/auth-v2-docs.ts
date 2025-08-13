import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

export function LoginV2Docs() {
    return applyDecorators(
        ApiOperation({ summary: 'User login to get access token' }),
        ApiResponse({ status: 200, description: 'Login successful, returns access token and user info.' }),
        ApiResponse({ status: 401, description: 'Unauthorized. Invalid credentials.' }),
    );
}

export function RegisterV2Docs() {
    return applyDecorators(
        ApiOperation({ summary: 'Register a new user account' }),
        ApiResponse({ status: 201, description: 'User successfully registered.' }),
        ApiResponse({ status: 400, description: 'Bad Request. Invalid input data.' }),
        ApiResponse({ status: 409, description: 'Conflict. User with this email already exists.' }),
    );
}

export function ProfileV2Docs() {
    return applyDecorators(
        ApiOperation({ summary: 'Get current user profile' }),
        ApiResponse({ status: 200, description: 'Returns the current user profile data.' }),
        ApiResponse({ status: 401, description: 'Unauthorized. Token not provided or invalid.' }),
        ApiBearerAuth(),
    );
}
