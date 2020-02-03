
Jaeger : http://localhost:16686   
Prometheus : http://localhost:9090   
Grafana : http://localhost:3000   

---
# Run springboot intelij

```
# Run jaeger
docker run -d —name jaeger \
  -e COLLECTOR_ZIPKIN_HTTP_PORT=9411 \
  -p 5775:5775/udp \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 14268:14268 \
  -p 14250:14250 \
  -p 9411:9411 \
  jaegertracing/all-in-one:1.16


# get hello
curl localhost:8080/hello

curl localhost:8080/chaining

Open the Jaeger UI on http://localhost:16686   

```


# Instrument Code: Java SpringBoot

With the version 2 of SpringBoot , the standard way to generte metrics it's use Micrometer library. (backported in Springboot 1.5)
This library can expose metrics in differents formats and you can easilly add custom metrics to you app.

If you enable Prometeus format for SpringBoot micrometer, you can use this dashboard for view all standard metrics.
Install dashboard https://grafana.com/dashboards/4701

Look, the example code for see how you can add custom metrics to your application.

( Counter of hellos )









## 5 - Setup Grafana

Uncomment grafana in docker-compose.yml and launch it:

```
docker-compose up -d grafana
```

Open [http://localhost:3000](http://localhost:3000) (user: admin / pass: workshop).

Add a new Prometheus datasource to Grafana.

- Name : Prometheus
- Pointing to http://prometheus:9090



# Resources

[Spring Boot Tutorial - Bootstrap a Simple App | Baeldung](https://www.baeldung.com/spring-boot-start)
[Hawkular - OpenTracing Spring Boot Instrumentation](https://www.hawkular.org/blog/2017/06/9/opentracing-spring-boot.html)
https://github.com/opentracing-contrib/java-spring-cloud
[OpenTracing Spring Boot Instrumentation - DZone Java](https://dzone.com/articles/opentracing-spring-boot-instrumentation)
[Mission Control : JVM + IoT = FUN : Deep dive into distributed tracing with Spring Boot and Flight Recorder](http://www.wengnermiro.com/2018/12/deep-dive-into-distributed-tracing-with.html)

[Mastering Distributed Tracing: Analyzing performance in microservices and … - Yuri Shkuro - Google Livres](https://books.google.be/books?id=4AuLDwAAQBAJ&pg=PA149&lpg=PA149&dq=example+opentracing-spring-cloud-starter&source=bl&ots=Of1FBVdgjC&sig=ACfU3U3T2EOI0cKjiO-P_upcnQ4agXjbLg&hl=fr&sa=X&ved=2ahUKEwja8diimrbnAhVNLVAKHfG1DMMQ6AEwEnoECAwQAQ#v=onepage&q=example%20opentracing-spring-cloud-starter&f=false)
[Mastering-Distributed-Tracing/Chapter04 at master · PacktPublishing/Mastering-Distributed-Tracing · GitHub](https://github.com/PacktPublishing/Mastering-Distributed-Tracing/tree/master/Chapter04)

[GitHub - opentracing-contrib/java-spring-jaeger](https://github.com/opentracing-contrib/java-spring-jaeger)



# TODO
- Add trace_id in logs and link to dashboard jaeger
- Add loki plugin for logs https://github.com/grafana/loki/tree/master/cmd/docker-driver
https://grafana.com/blog/2019/07/15/lokis-path-to-ga-docker-logging-driver-plugin-support-for-systemd/

https://devopstales.github.io/cloud/grafana-loki/