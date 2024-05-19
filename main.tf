provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_storage_bucket" "artifact_bucket" {
  name     = "${var.project_id}-artifacts"
  location = var.region
}

resource "google_cloud_run_service" "default" {
  name     = var.service_name
  location = var.region

  template {
    spec {
      containers {
        image = var.image_url

        env {
          name  = "GOOGLE_APPLICATION_CREDENTIALS"
          value = var.google_application_credentials
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

resource "google_project_iam_member" "run_invoker" {
  project = var.project_id
  role    = "roles/run.invoker"
  member  = "allUsers"
}
