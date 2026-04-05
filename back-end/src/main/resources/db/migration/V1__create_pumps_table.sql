CREATE TABLE pumps (
    id UUID PRIMARY KEY,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    status VARCHAR(30) NOT NULL,
    name VARCHAR(100),
    address VARCHAR(255),
    pump_code VARCHAR(50) UNIQUE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE INDEX idx_pumps_lat_lng ON pumps(latitude, longitude);
CREATE INDEX idx_pumps_status ON pumps(status);
CREATE INDEX idx_pumps_code ON pumps(pump_code);