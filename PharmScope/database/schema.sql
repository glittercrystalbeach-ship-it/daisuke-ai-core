CREATE TABLE master_drugs (
    drug_id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    generic_name VARCHAR(100),
    specification VARCHAR(100),
    manufacturer VARCHAR(100),
    classification VARCHAR(20),
    pediatric_dosage TEXT NOT NULL,
    contraindications TEXT,
    interactions TEXT,
    pmda_url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_by VARCHAR(50),
    approved_at TIMESTAMP,
    status VARCHAR(20) DEFAULT 'approved'
);

CREATE TABLE pending_drugs (
    id SERIAL PRIMARY KEY,
    pending_drug_id VARCHAR(20) UNIQUE NOT NULL,
    pharmacy_id VARCHAR(50) NOT NULL,
    user_id VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    generic_name VARCHAR(100),
    specification VARCHAR(100),
    manufacturer VARCHAR(100),
    pediatric_dosage TEXT NOT NULL,
    contraindications TEXT,
    pmda_url VARCHAR(500),
    status VARCHAR(20) DEFAULT 'pending_review',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rejection_reason TEXT,
    source VARCHAR(50)
);

CREATE TABLE audit_logs (
    log_id SERIAL PRIMARY KEY,
    user_id VARCHAR(50),
    pharmacy_id VARCHAR(50),
    drug_id VARCHAR(20),
    check_result JSONB,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (drug_id) REFERENCES master_drugs(drug_id)
);

CREATE TABLE users (
    user_id VARCHAR(50) PRIMARY KEY,
    pharmacy_id VARCHAR(50) NOT NULL,
    name VARCHAR(100),
    role VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pharmacies (
    pharmacy_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
