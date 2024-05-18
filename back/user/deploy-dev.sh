#1
echo "run shell script"
EXIST_BLUE=$(docker-compose -p blue -f docker-compose-dev.blue.yml ps | grep Up)

if [ -z "$EXIST_BLUE" ]; then
    docker-compose -p blue -f docker-compose-dev.blue.yml up -d
    BEFORE_COLOR="green"
    AFTER_COLOR="blue"
    BEFORE_PORT=8096
    AFTER_PORT=8086
else
    docker-compose -p green -f docker-compose-dev.green.yml up -d
    BEFORE_COLOR="blue"
    AFTER_COLOR="green"
    BEFORE_PORT=8086
    AFTER_PORT=8096
fi

echo "${AFTER_COLOR} server up(port:${AFTER_PORT})"

# 2
for cnt in {1..30}
do
    echo "서버 응답 확인중(${cnt}/30)";
    UP=$(curl -s http://localhost:${AFTER_PORT}/actuator)
    if [ -z "${UP}" ]
        then
            sleep 30
            continue
        else
            break
    fi
done

if [ $cnt -eq 30 ]
then
    echo "서버가 정상적으로 구동되지 않았습니다."
    exit 1
fi

# 3
echo "$BEFORE_COLOR server down(port:${BEFORE_PORT})"
docker-compose -p ${BEFORE_COLOR} -f docker-compose-dev.${BEFORE_COLOR}.yml down