CREATE TABLE geocode_cache (
    id UUID PRIMARY KEY,
    query_text VARCHAR(255) NOT NULL,
    normalized_query VARCHAR(255),
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    formatted_address VARCHAR(255),
    provider VARCHAR(50),
    accuracy VARCHAR(50),
    expires_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE INDEX idx_geocode_query_text ON geocode_cache(query_text);
CREATE INDEX idx_geocode_normalized_query ON geocode_cache(normalized_query);