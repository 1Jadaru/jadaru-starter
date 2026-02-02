#!/bin/bash
# Generic UAT Script for Jadaru Next.js Projects
# Usage: ./scripts/uat.sh [port]
# Default port: 3000
#
# Customize the ROUTES array for your project

PORT=${1:-3000}
BASE_URL="http://localhost:$PORT"
PASSED=0
FAILED=0

echo "=================================="
echo "UAT - $(date)"
echo "Target: $BASE_URL"
echo "=================================="

test_route() {
    local route=$1
    local expected=$2
    local description=$3
    
    code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL$route" 2>/dev/null)
    
    if [ "$code" == "$expected" ]; then
        echo "✅ $route -> $code ($description)"
        ((PASSED++))
    else
        echo "❌ $route -> $code (expected $expected) - $description"
        ((FAILED++))
    fi
}

echo ""
echo "=== Public Routes ==="
test_route "/" "200" "Homepage"
test_route "/privacy" "200" "Privacy page"
test_route "/terms" "200" "Terms page"

echo ""
echo "=== Protected Routes (expect redirect without session) ==="
test_route "/dashboard" "307" "Dashboard"
test_route "/admin" "307" "Admin"

echo ""
echo "=== API Health ==="
test_route "/api/health" "200" "Health endpoint"

echo ""
echo "=================================="
echo "Results: $PASSED passed, $FAILED failed"
echo "=================================="

[ $FAILED -gt 0 ] && exit 1 || exit 0
