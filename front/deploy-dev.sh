#1
echo "run shell script"
EXIST_BLUE=$(docker-compose -p blue -f docker-compose-dev.blue.yml ps | grep Up)

if [ -z "$EXIST_BLUE" ]; then
    docker-compose -p blue -f docker-compose-dev.blue.yml up -d
    BEFORE_COLOR="green"
    AFTER_COLOR="blue"
    BEFORE_PORT=5174
    AFTER_PORT=5173
else
    docker-compose -p green -f docker-compose-dev.green.yml up -d
    BEFORE_COLOR="blue"
    AFTER_COLOR="green"
    BEFORE_PORT=5173
    AFTER_PORT=5174
fi

echo "${AFTER_COLOR} server up(port:${AFTER_PORT})"

# 2
for cnt in {1..10}
do
    echo "서버 응답 확인중(${cnt}/10)";
    UP=$(curl -s http://localhost:${AFTER_PORT})
    if [ -z "${UP}" ]
        then
            sleep 10
            continue
        else
            break
    fi
done

if [ $cnt -eq 10 ]
then
    echo "서버가 정상적으로 구동되지 않았습니다."
    exit 1
fi

# 3
echo "NginX Setting..."
sudo sed -i s/${BEFORE_PORT}/${AFTER_PORT}/ /etc/nginx/conf.d/include/service_uri.conf && sudo nginx -s reload
echo "Deploy Completed!!"

# 4
echo "$BEFORE_COLOR server down(port:${BEFORE_PORT})"
docker-compose -p ${BEFORE_COLOR} -f docker-compose-dev.${BEFORE_COLOR}.yml down