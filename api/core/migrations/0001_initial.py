# Generated by Django 4.1.5 on 2023-01-28 18:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Team",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                (
                    "team_shield",
                    models.ImageField(blank=True, null=True, upload_to="team_shields/"),
                ),
                ("number_of_players", models.IntegerField(blank=True, null=True)),
                ("average_age", models.FloatField(blank=True, null=True)),
                ("country", models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name="Player",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                (
                    "picture",
                    models.ImageField(blank=True, null=True, upload_to="players/"),
                ),
                ("shirt_number", models.IntegerField()),
                ("position", models.CharField(max_length=50)),
                ("height", models.IntegerField()),
                ("weight", models.IntegerField()),
                ("birth_date", models.DateField()),
                ("age", models.IntegerField()),
                (
                    "foot",
                    models.CharField(
                        choices=[
                            ("right", "Derecho"),
                            ("left", "Izquierdo"),
                            ("both", "Ambos"),
                        ],
                        max_length=10,
                    ),
                ),
                (
                    "team",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="players",
                        to="core.team",
                    ),
                ),
            ],
        ),
    ]