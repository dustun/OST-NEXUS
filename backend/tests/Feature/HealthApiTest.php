<?php

namespace Tests\Feature;

use Tests\TestCase;

class HealthApiTest extends TestCase
{
    public function test_the_api_health_endpoint_uses_the_standard_response_envelope(): void
    {
        $response = $this->getJson('/api/v1/health');

        $response
            ->assertOk()
            ->assertJsonPath('data.service', 'ost-nexus-api')
            ->assertJsonPath('data.status', 'ok')
            ->assertJsonPath('meta.apiVersion', 'v1')
            ->assertJsonPath('errors', []);
    }
}
