INSERT INTO pumps (id, latitude, longitude, status, name, address, pump_code, created_at, updated_at)
VALUES
    (RANDOM_UUID(), 51.507351, -0.127758, 'ACTIVE', 'Central Pump', 'Central London', 'PUMP-001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (RANDOM_UUID(), 51.503363, -0.119594, 'NEEDS_REPAIR', 'Riverside Pump', 'South Bank, London', 'PUMP-002', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (RANDOM_UUID(), 51.532100, -0.472900, 'IN_MAINTENANCE', 'Campus Main Pump', 'Brunel University London', 'PUMP-003', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (RANDOM_UUID(), 51.515400, -0.141000, 'OUT_OF_SERVICE', 'West Backup Pump', 'Oxford Circus, London', 'PUMP-004', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO geocode_cache (
    id,
    query_text,
    normalized_query,
    latitude,
    longitude,
    formatted_address,
    provider,
    accuracy,
    expires_at,
    created_at,
    updated_at
)
VALUES
    (
        RANDOM_UUID(),
        '10 Downing Street, London',
        '10 downing street, london',
        51.503363,
        -0.127625,
        '10 Downing Street, London SW1A 2AA, UK',
        'seed',
        'high',
        DATEADD('DAY', 30, CURRENT_TIMESTAMP),
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        RANDOM_UUID(),
        'Buckingham Palace, London',
        'buckingham palace, london',
        51.501364,
        -0.141890,
        'Buckingham Palace, London SW1A 1AA, UK',
        'seed',
        'high',
        DATEADD('DAY', 30, CURRENT_TIMESTAMP),
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        RANDOM_UUID(),
        'Brunel University London',
        'brunel university london',
        51.532100,
        -0.472900,
        'Brunel University London, Kingston Lane, Uxbridge UB8 3PH, UK',
        'seed',
        'high',
        DATEADD('DAY', 30, CURRENT_TIMESTAMP),
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );